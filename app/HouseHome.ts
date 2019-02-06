import {Component} from '@angular/core';
import {HouseService} from "./House-service";
import {element} from "@angular/upgrade/esm/src/angular_js";

@Component({
    selector: 'book-show',
    template: `
    <div>
        <h1>List of House</h1>
        <ul>
            <li *ngFor="let houseList of HouseData.houses">
                {{ houseList.street }}
            </li>
        </ul>
        <h1>Result 1</h1>
        <ul>
            <li *ngFor="let houseList of finalHouseDistanceList">
                {{ houseList.street }}
            </li>
        </ul>
        <h1>Result 2</h1>
        <ul>
            <li *ngFor="let houseList of finalRoomList">
                {{ houseList.street }}
            </li>
        </ul>
    </div>
    `
})

export class HouseHomeComponent {
    constructor(public HouseService:HouseService) {
            this.HouseService.getHoueseData()
                .subscribe(
                    (data) => {
                        this.HouseData = data;
                        var listHouse = data.houses;
                        var sisterAddressIndex =  this.findSisterLatLon(listHouse,'Eberswalder Straße 55');
                        var sLat =  data.houses[sisterAddressIndex].coords.lat;
                        var sLon =  data.houses[sisterAddressIndex].coords.lon;

                        for(var i = 0; i < listHouse.length; i++){
                        var distance1 = this.distance(listHouse[i].coords.lat,listHouse[i].coords.lon,sLat,sLon)
                            this.finalHouseDistanceList.push( {
                                    street : listHouse[i].street,
                                    distance : distance1 })

                        }
                        this.finalHouseDistanceList = this.finalHouseDistanceList.sort(function (a,b) {
                            return a.distance - b.distance;

                        })
                        this.finalRoomList = data.houses.filter(function (a) {
                            if(a.params && a.params.rooms) {
                                return a.params.rooms > 5;
                            }

                        })

                        this.dataAvailable = true
                    }
                    , (error) => {
                        this.errorMessage = error;
                    }
                );
    }

    // TO FIND DISTANCE

    distance(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a =
            0.5 - Math.cos(dLat)/2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon))/2;

        return R * 2 * Math.asin(Math.sqrt(a));
    }

    // TO FIND INDEX OF SISTER ADDRESS FROM TASK NO 1

     findSisterLatLon(arr, k){
        if (!arr){
            return -1;
        }
        for(var i=0; i<arr.length; i++){
            var index = arr[i].street.indexOf(k);
            if (index > -1){
                return i;
            }
        }
        return -1;
    }

    HouseData = {};
    finalHouseDistanceList = [];
    finalRoomList = [];
    dataAvailable:boolean = false;
    errorMessage = '';

}
