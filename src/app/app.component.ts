import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCreditCardComponent, NgxCreditCardDirective } from 'ngx-credit-card';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,
        NgxCreditCardComponent,
        NgxCreditCardDirective
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private fb = inject(FormBuilder)

    //creditNumber = '4513680331778143'

    form: FormGroup = this.fb.group({
        name: [''],
        number: ['4513680331778143'],
        expiration: [''],
        security_code: ['']
    })


}
