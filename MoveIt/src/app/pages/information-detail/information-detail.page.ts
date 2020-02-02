import {Component, OnInit} from '@angular/core';
import {InformationService} from '../../services/information/information.service';
import {Information} from '../../model/information';
import {Location} from '@angular/common';
import {Router, NavigationExtras} from '@angular/router';



@Component({
    selector: 'app-information-detail',
    templateUrl: './information-detail.page.html',
    styleUrls: ['./information-detail.page.scss'],
})
export class InformationDetailPage implements OnInit {
    static: any;
    dynamic: any;

    constructor(private informationService: InformationService, private location: Location, private router: Router) {
        this.location = location;
        this.dynamic = informationService.getAllInformation();

        this.static = [
            {
                title: 'moderate vs. vigorous',
                description: 'moderate activity'
            },
            {
                title: 'WHO Guidelines',
                description: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum '
            },
        ];
    }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }

    passData(i){

        const object = this.static[i];

        let navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(object)
            }
        }
        this.router.navigate(['/menu/information/information/single'], navigationExtras);
    }

    // TODO For testing purposes only, only reserachers can create activities
    createInformation() {
        this.informationService.createInformation(new Information()).then(
            res => {
                console.log(res);
            },
            err => console.log(err));
    }

    // TODO For testing purposes only, only reserachers can edit activities
    editInformation() {
        this.informationService.editInformation('-LxazngpwtMfICMajpTv', new Information()).then(
            res => {
                console.log(res);
            },
            err => console.log(err));
    }

    // TODO For testing purposes only, only the detail view needs to get a single information
    getInformation() {
        this.informationService.getInformation('-LxazngpwtMfICMajpTv').then(
            res => {
                console.log(res);
            },
            err => console.log(err)
        );
    }
}
