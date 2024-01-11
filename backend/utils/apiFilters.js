class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {                                                                      // ternary operator
          name: {
            $regex: this.queryStr.keyword,                      //these are mongoose operators like regex, options we can read about them
            $options: "i",                                             // this search is going to be case insensitive
          },
        }
      : {}; 

    this.query = this.query.find({ ...keyword });    //spread operator  copy the things
    return this;
  } 



  filters() {
    const queryCopy = { ...this.queryStr };

    // Fields to remove        // keyword search already done in search so removing it. ALso page need to be rmoved as its added in pagination
    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);   //mongodb works with $ so appending it

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }


  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;  // default page no. is 1
    const skip = resPerPage * (currentPage - 1);      // Lets say we need to go second page then skip first page 10 content if resperpage = 10;

    this.query = this.query.limit(resPerPage).skip(skip);       //provided by mongooses
    return this;
  }
}

export default APIFilters;