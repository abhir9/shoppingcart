/**
 * Created by abhi on 7/14/2018.
 */
import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AlertService} from '../_services/index';
import {timeout} from "rxjs/operator/timeout";

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnDestroy {
    message: any;
    private subscription: Subscription;

    constructor(private alertService: AlertService) {
        // subscribe to alert messages
        this.subscription = alertService.getMessage().subscribe(message => {
            this.message = message;
        });
    }

    ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        this.subscription.unsubscribe();
    }

    removeMessage(): void {
        this.message = '';
    }
}