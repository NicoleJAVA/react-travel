import { API_SOURCE, UDEMY } from "../../helpers/constants";

let API_BASE;
API_BASE = API_SOURCE === UDEMY ? "http://123.56.149.216:8089" : "https://vue3-course-api.hexschool.io/api/matchakuma";
export { API_BASE };
