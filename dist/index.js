"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database = __importStar(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser")); // dùng để giúp đọc và hiểu dữ liệu mà client gửi lên server. ở dạng json khi req.body
const index_route_1 = __importDefault(require("./routes/client/index_route"));
const index_route_2 = __importDefault(require("./routes/admin/index_route"));
const config_1 = require("./config/config");
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
dotenv_1.default.config();
database.connect();
const app = (0, express_1.default)();
const port = process.env.PORT;
// parse application/x-www-form-urlencoded (áp dụng cho dữ liệu lấy từ phần form)
app.use(body_parser_1.default.urlencoded({ extended: false }));
//hoặc dùng cách này
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.static(`${__dirname}/public`));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
//tinyMCE
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'node_modules', 'tinymce')));
//end tinyMCE
//app locals variables, áp biến đó cho toàn cục, chỉ áp dụng cho file render, ở đây là file PUG
app.locals.prefixAdmin = config_1.systemConfig.prefixAdmin;
//admin routes
(0, index_route_2.default)(app);
//client routes
(0, index_route_1.default)(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
