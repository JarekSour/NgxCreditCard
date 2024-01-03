import { Directive, ElementRef, HostListener, Input, Optional, Self, inject } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
    selector: '[ngxCreditCard]',
    standalone: true,
})
export class NgxCreditCardDirective implements ControlValueAccessor{

    private _value: null | string = null

    constructor(private elementRef: ElementRef<HTMLInputElement>,
        @Optional() @Self() public ngControl: NgControl) {


        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this
        }
    }

    get value() {
        return this._value
    }

    @Input('value')
    set value(value) {
        this._value = value
        this.formatNumber(value)
    }

    private formatNumber(value: any) {
        let newVal: string = value !== null ? value.replace(/\D/g, '').substring(0, 16) : '';

        let splitVal = [];
        for (let i = 0; i < newVal.length; i = i + 4) {
            splitVal.push(newVal.slice(i, i + 4));
        }

        this.elementRef.nativeElement.value = splitVal.join(' ')
        this._value = newVal
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: any) {
        let rut = value.replace(/[^kK0-9]/g, '')
        this._value = rut
        this._onChange(this._value)
    }

    @HostListener('ngModelChange', ['$event'])
    onChange(value: any) {
        this.formatNumber(value)
    }

    @HostListener('blur') _onBlur() {
        this.formatNumber(this._value)
    }

    @HostListener('focus') onFocus() {
        if (this.ngControl?.control)
            this.ngControl.control.markAllAsTouched()
    }

    _onChange(value: any) { }

    writeValue(value: any): void {
        this._value = value
        this.formatNumber(this._value)
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn
    }

    registerOnTouched() { }
}
