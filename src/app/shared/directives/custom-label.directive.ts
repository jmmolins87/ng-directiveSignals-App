import { 
  Directive, 
  ElementRef, 
  Input, 
  OnInit 
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'green';
  private _errors?: ValidationErrors | null;

  @Input()
  public set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  public set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement> ) {
    this.htmlElement = el;
  }

  ngOnInit() {}

  setStyle(): void {
    if( !this.htmlElement ) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement ) return;
    if( !this._errors ) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys( this._errors );
    if( errors.includes( 'required' )) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if( errors.includes( 'minlength' )) {
      const min = this._errors!['minlength']['requiredLength'];
      const currentErrors = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `El minimo de caracteres es ${min} y tienes ${currentErrors}`;
      return;
    }

    if( errors.includes( 'email' )) {
      this.htmlElement.nativeElement.innerText = 'El formato del correo es incorrecto';
      return; 
    }

  }

}
