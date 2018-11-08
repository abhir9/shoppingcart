/**
 * Created by abhi .
 */
import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Menu, Order, User} from '../_models/index';
import {AlertService, MenuService, UserService} from '../_services/index';
import {OrderService} from "../_services/order.service";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    currentUser: User;
    check: boolean;
    page2: boolean;
    menus: Menu[] = [];
    orders: any;
    loading = false;
    total: number
    orderdone: boolean;
    IsHidden: boolean;
    menuItems: any;

    constructor(private userService: UserService, private alertService: AlertService, private menuService: MenuService, private orderService: OrderService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.IsHidden = true;
        this.check = false;
        this.total = 0;
        this.page2 = false;
        this.orders = {
            category: {},
            total: this.total,
            user: this.currentUser
        }
        this.orderdone = false;
    }

    ngOnInit() {
        this.loadAllMenus();
    }

    getTotal() {
        this.menuItems = (this.menus as any);
        this.total = 0;
        if(this.menuItems.category)
        this.menuItems.category.forEach(category => {
            category.items.forEach(item => {
                item.itemTotal = (item.price * (item.quantity ? item.quantity : item.quantity = 1));
                if (item.istick)
                    this.total += parseInt(item.itemTotal);
            })
        })
        return this.total;
    }

    saveOrder() {
        this.menuItems = (this.menus as any);
        this.orders.category = [];
        this.orders.total = this.total;
        this.orders.user = this.currentUser;
        this.menuItems.category.forEach((category, key1) => {
            category.items.forEach((item, key2) => {
                if (item.istick == true)
                    this.orders.category.push({'name': category.name, items: item});
            })
        });
        this.loading = true;
        this.orderService.create(this.orders as Order)
            .subscribe(
                data => {
                    this.alertService.success('Updated Successfully', true);
                    this.orderdone = true;
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                },
                error => {
                    this.alertService.error(JSON.parse(error._body).message);
                    this.loading = false;
                });
    }

    private loadAllMenus() {
        this.menuService.getAll().subscribe(menus => {
            this.menus = this.menuItems = menus[0];
        });
    }
}