// all values in a set are unique unlike array
// any type of value can exist in a set
// created using a new keyword

// empty set
// const bannedHashTags = new Set();

// create set using iterable
const bannedHashTags = new Set(["nofilter", "justsaying", "winning", "yolo"]);

// add to set ; if item is not in set it will be added; if it is already there it will be ignored
bannedHashTags.add("bestlife");

// set add method return set so we can chain them
bannedHashTags.add("bestlife").add("selfie");

// checking value is in set; use has() method; return boolean
bannedHashTags.has("tbt");

// delete() method removes an element
bannedHashTags.delete("winning");

// clear() remove all elements
bannedHashTags.clear();

function filerHashTags(tags) {
  const bannedHashTags = new Set(["nofilter", "justsaying", "winning", "yolo"]);
  return tags.filter((tag) => !bannedHashTags.has(tag));
}

const susanTags = ['happymonday', 'yolo', 'winning', 'sunset'];

filerHashTags(susanTags); // in console

// sets are efficent on adding and checking if value exist or not

// remove duplicate using set
const ages = [45, 42, 21, 23 , 24, 98, 2, 4, 4];
[...new Set(ages)]
