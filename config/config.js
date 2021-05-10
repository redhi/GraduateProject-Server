module.exports = {
  server_port: 3000,
  db_url: "mongodb://localhost:27017/local",
  db_schemas: [
    {
      file: "./member_schema",
      collection: "Member",
      schemaName: "MemberSchema",
      modelName: "MemberModel",
    },
    {
      file: "./itemlist_schema",
      collection: "ItemList",
      schemaName: "ItemListSchema",
      modelName: "ItemListModel",
    },
    {
      file: "./categoryname_schema",
      collection: "CategoryName",
      schemaName: "CategoryNameSchema",
      modelName: "CategoryNameModel",
    },
    {
      file: "./betcashbook_schema",
      collection: "BetCashBook",
      schemaName: "BetCashBookSchema",
      modelName: "BetCashBookModel",
    },
  ],
  route_info: [
    {
      file: "./login",
      path: "/process/login",
      method: "authuser",
      type: "post",
    },
    {
      file: "./login",
      path: "/process/register",
      method: "register",
      type: "post",
    },
    {
      file: "./login",
      path: "/process/validate",
      method: "validate",
      type: "post",
    },
    {
      file: "./itemlist",
      path: "/process/additemlist",
      method: "additemlist",
      type: "post",
    },
    {
      file: "./itemlist",
      path: "/process/deleteitemlist",
      method: "deleteitemlist",
      type: "post",
    },
    {
      file: "./itemlist",
      path: "/process/deleteitem",
      method: "deleteitem",
      type: "post",
    },
    {
      file: "./itemlist",
      path: "/process/distinctlist",
      method: "distinctitemlist",
      type: "post",
    },

    {
      file: "./itemlist",
      path: "/process/showitemlist/:id/:year/:month/:date",
      method: "showitemlist",
      type: "get",
    },
    {
      file: "./itemlist",
      path: "/process/modifyitemlist",
      method: "modifyitemlist",
      type: "post",
    },
    {
      file: "./itemlist",
      path: "/process/searchitemlist/:ENGLISH/:id",
      method: "searchitemlist",
      type: "get",
    },
  ],
  jsonrpc_api_path: "/api",
};
