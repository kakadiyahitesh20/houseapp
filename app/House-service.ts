import {Injectable} from "@angular/core";
import {Http} from '@angular/http';

@Injectable()
export class HouseService {
    constructor(public _http:Http) {
    }

    getHoueseData() {
        return this._http.get("https://demo.interfacema.de/programming-assessment-1.0/buildings")
            .map(function (response) {
                return response.json()
            });
    }
}