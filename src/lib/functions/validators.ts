const regex = {
  name: /^(?!-)(?!.*-$)[a-zA-Z-]+$/,
  email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  password: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
  phone: /^[6789]\d{9}/,
};

class Validator {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
  name() {
    const nameRegex = new RegExp(regex.name);
    return nameRegex.test(this.value);
  }
  email() {
    const emailRegex = new RegExp(regex.email);
    return emailRegex.test(this.value);
  }

  password() {
    const pwdRegex = new RegExp(regex.password);
    return pwdRegex.test(this.value);
  }
  phone() {
    const phoneRegex = new RegExp(regex.phone);
    return phoneRegex.test(this.value);
  }
}

export default Validator;
