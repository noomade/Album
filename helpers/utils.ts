export type FieldTypeTextValues = undefined | null | string;

export const composeValidators = (...validators: Function[]) => (value: FieldTypeTextValues) =>
  validators.reduce((error, validator) => (error ? error : validator(value)), undefined);

export const required = (value: FieldTypeTextValues) =>
  (value != null || value != undefined) && value.toString().length > 0 ? undefined : 'Campo Obrigatório';

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email = (value: FieldTypeTextValues) => value && (!emailRegex.test(value) ? 'Email inválido' : undefined);

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
