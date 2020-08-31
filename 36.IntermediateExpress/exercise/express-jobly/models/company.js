const db = require("../db");
const ExpressError = require("../helpers/expressError");
const e = require("express");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Company {
  constructor(handle, name, num_employees, description, logo_url) {
    this.handle = handle;
    this.name = name;
    this.num_employees = num_employees;
    this.description = description;
    this.logo_url = logo_url;
  }

  /*
   * Return an array of company data
   * [{handle, name, num_employees, description, logo_url}...]
   */
  static async findAll() {
    const results = await db.query(`
            SELECT handle, name 
            FROM companies`);
    return results.rows;
  }

  static async findAllSearch(search, min_employees, max_employees) {
    let searchQuery = `SELECT handle, name FROM companies WHERE `;
    if (min_employees > max_employees) {
      throw new ExpressError("Min employess more than max employees", 400);
    }

    if (search) {
      searchQuery = searchQuery + `handle ILIKE '%${search}%'`;
    }

    if (min_employees) {
      if (search) {
        searchQuery = searchQuery + " AND ";
      }
      searchQuery = searchQuery + `num_employees >= ${min_employees} `;
    }

    if (max_employees) {
      if (search || min_employees) searchQuery = searchQuery + " AND ";
      searchQuery = searchQuery + `num_employees <= ${max_employees}`;
    }

    const results = await db.query(searchQuery);
    if (results.rows.length === 0) {
      throw new ExpressError("No results", 404);
    }
    return results.rows;
  }

  static async create(company) {
    // make sure company with same name and handle doesn't exist
    const dupsExist = await db.query(
      `SELECT name, handle FROM companies 
        WHERE name = $1 OR handle = $2`,
      [company.name, company.handle]
    );

    if (dupsExist.rows.length > 0) {
      throw new ExpressError("Company with name or handle already exists", 400);
    }

    const results = await db.query(
      `
    INSERT INTO companies (handle, name, num_employees, description, logo_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING handle, name, num_employees, description, logo_url
    `,
      [
        company.handle,
        company.name,
        company.num_employees,
        company.description,
        company.logo_url,
      ]
    );

    return results.rows[0];
  }

  static async findByHandle(handle) {
    if (!handle) {
      throw new ExpressError("Handle value is required", 400);
    }

    const results = await db.query(
      `SELECT handle, name, num_employees, description, logo_url
            FROM companies WHERE handle = $1`,
      [handle]
    );

    const company = results.rows[0];

    if (!company) {
      throw new ExpressError(`Company not found for handle ${handle}`, 404);
    }

    return new Company(
      company.handle,
      company.name,
      company.num_employees,
      company.description,
      company.logo_url
    );
  }

  async update(updatedCompany) {
    const queryBuilder = sqlForPartialUpdate(
      "companies",
      updatedCompany,
      "handle",
      this.handle
    );
    const results = await db.query(queryBuilder.query, queryBuilder.values);
    const company = results.rows[0];

    this.handle = company.handle;
    this.name = company.name;
    this.description = company.description;
    this.logo_url = company.logo_url;
    this.num_employees = company.num_employees;
  }

  async delete() {
    const query = `DELETE FROM companies WHERE handle = $1 RETURNING handle`;
    const results = await db.query(query, [this.handle]);
    return { message: "deleted" };
  }
}

module.exports = Company;
