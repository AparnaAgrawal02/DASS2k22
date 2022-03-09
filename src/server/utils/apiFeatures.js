class ApiFeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }
    search() {
        const keyword = this.querystr.keyword ?
            {
                Item: {
                    $regex: this.querystr.keyword,
                    $options: "i",
                },
            } :
            {};
        console.log(keyword);
        this.query = this.query.find(keyword);
        return this;
    }

    filter() {
        const queryCopy = {...this.querystr};
        //   Removing some fields for category
        //console.log(queryCopy);
        const removeFields = ["keyword", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // Filter For Price and Rating
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
        this.query = this.query.find(JSON.parse(querystr));
        //console.log(querystr);
        return this;
    }
    // pagination(resultperpage) {
    //     const currentPage = Number(this.queryStr.page) || 1;
    
    //     const skip = resultperpage * (currentPage - 1);
    
    //     this.query = this.query.limit(resultperpage).skip(skip);
    
    //     return this;
    // }
}
module.exports = ApiFeatures;