const rules = {
  required: v => !!v || 'Поле не может быть пустым',
  phone: v => v.length === 9 || 'Введите 9 значный номер',
  min: v => v.length > 4 || 'Field must be more than 4 characters',
  email: value =>
    value.lastIndexOf('.') - value.indexOf('@') > 1 ||
    'Email должен быть корректным'
}

export default rules
