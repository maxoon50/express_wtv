import jsonfile from "jsonfile";
import config from "config";
import {files} from "../src/data/movie-test";

beforeEach(function(done) {
    // on reset le fichier movie.test.json
    jsonfile.writeFile(config.get('movies_data'),files, function (err) {});
    done();
});