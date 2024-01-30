import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';  // Importar AbstractControl y ValidationErrors
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AppComponent {
  title = 'formularioValidado';
  formulario: FormGroup;
  mensaje: string = '';
  formularioEnviado: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]*$/)]],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(13)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator]],
      salario: ['', [Validators.required, Validators.min(450), Validators.max(5000)]],
      email: ['', [Validators.required, Validators.email]],
      sitioWeb: ['', [Validators.required,Validators.pattern(/^http(s)?:\/\/.*/)]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
    });
  }

  fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
    const fechaNacimiento = new Date(control.value);
    const currentDate = new Date();

    if (isNaN(fechaNacimiento.getTime())) {
      return { invalidDate: true };
    }

    if (fechaNacimiento > currentDate || fechaNacimiento < new Date('1900-01-01')) {
      return { invalidRange: true };
    }

    return null;
  }

  guardarEmpleado() {
    this.formularioEnviado = true;
    if (this.formulario.valid) {
      
      this.mensaje = 'Empleado guardado exitosamente';
    } else {
     
      this.mensaje = 'Por favor, corrige las validaciones del formulario.';
      this.validarCampos();
    }
  }

  private validarCampos() {
    Object.keys(this.formulario.controls).forEach(controlName => {
      const control = this.formulario.get(controlName);
      if (control?.invalid && (control.touched || control.dirty)) {
        this.mensaje += `\n${controlName}: `;
        Object.keys(control.errors || {}).forEach(error => {
          this.mensaje += `${error} `;
        });
      }
    });
  }
}
