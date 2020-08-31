const db = require("../db");
const expressError = require("../helpers/expressError");

const sqlForPartialUpdate = require("../helpers/partialUpdate");
const { query } = require("../db");

class Job {
  constructor(title, salary, equity, company_handle) {
    this.title = title;
    this.salary = salary;
    this.equity = equity;
    this.company_handle = company_handle;
  }
  static async findAll({ search, min_salary, max_salary }) {
    let query = "SELECT title, company_handle FROM jobs";
    if (search || min_salary || max_salary) {
      query = query + " WHERE ";
      if (search) {
        query = query + ` title ILIKE '%${search}%'`;
      }

      if (min_salary) {
        if (search) {
          query = query + " AND ";
        }
        query = query + ` salary >= ${min_salary} `;
      }

      if (max_salary) {
        if (search || min_salary) {
          query = query + " AND ";
        }
        query = query + ` salary <= ${max_salary}`;
      }
    }

    console.log(query);

    const results = await db.query(`${query} ORDER BY date_posted DESC`);
    return results.rows;
  }

  static async create(job) {
    const newJob = await db.query(
      `
    INSERT INTO jobs (title, salary, equity, company_handle) 
    VALUES ($1, $2, $3, $4)
    RETURNING title, company_handle
      `,
      [job.title, job.salary, job.equity, job.company_handle]
    );

    return newJob.rows[0];
  }

  static async findById(id) {
    const job = await db.query(
      `
      SELECT title, company_handle
      FROM jobs 
      WHERE id = $1
      `,
      [id]
    );

    return job.rows[0];
  }

  static async delete(id) {
    const job = await db.query(
      `
      DELETE FROM jobs WHERE id = $1 RETURNING id`,
      [id]
    );
    if (job.rows[0]) return "Job deleted";
  }

  static async update(id, job) {
    const queryBuilder = sqlForPartialUpdate("jobs", job, "id", id);

    const results = await db.query(queryBuilder.query, queryBuilder.values);
    return results.rows[0];
  }

  static async findAllByHandle(handle) {
    const result = await db.query(
      `
      SELECT id, title, salary, equity
      FROM jobs
      WHERE company_handle = $1
      `,
      [handle]
    );

    return result.rows;
  }
}

module.exports = Job;
