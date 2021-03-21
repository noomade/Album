export type FieldTypeTextValues = undefined | null | string;
export type ValidatorFunction = (value: any) => string | undefined;

export const composeValidators = (...validators: any[]) => (value: FieldTypeTextValues) =>
  validators.reduce((error, validator) => (error ? error : validator(value)), undefined);

export const required = (value: FieldTypeTextValues): undefined | 'Campo Obrigatório' =>
  (value !== null || value !== undefined) && value.toString().length > 0 ? undefined : 'Campo Obrigatório';

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email = (value: FieldTypeTextValues): 'Email inválido' | undefined =>
  value && !emailRegex.test(value) ? 'Email inválido' : undefined;
