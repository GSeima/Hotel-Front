import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  // required: (error) => `This field is required`,
  required: ({controlName}) => controlName ? `${controlName} é obrigatório` : `Campo obrigatório`,
  pattern: (error) => `Formato inválido`,
  minlength: ({ controlName, requiredLength }) => `${controlName} não pode ter menos que ${requiredLength} caracteres`,
  maxlength: ({ controlName, requiredLength }) => `${controlName} não pode ter mais que ${requiredLength} caracteres`,
  min: ({ min }) => `Valor mínimo é ${min}`,
  max: ({ max }) => `Valor máximo é ${max}`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});