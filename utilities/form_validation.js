const crypto = require("crypto");
class Form {
  static roll_number_regex = /^[A-Z][A-Z][0-9][0-9][A-Z][0-9][0-9][0-9]$/;
  static email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  static mobile_number_regex = /[6-9][0-9]{9}/;
  static password_regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

  static makeNameSalt = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  constructor(
    name,
    roll_number,
    email,
    hostel,
    mobile_number,
    password_store_schema,
    password
  ) {
    this.name = name;
    this.roll_number = roll_number;
    this.email = email;
    this.hostel = hostel;
    this.mobile_number = mobile_number;
    this.password_store_schema = password_store_schema;
    this.password = password;
  }

  validation() {
    // let validation = [false, false, false, false];
    // roll_number_validation, email_validation, mobile_number_validation, password_validation
    if (
      this.roll_number.match(Form.roll_number_regex) &&
      this.email.match(Form.email_regex) &&
      this.mobile_number.match(Form.mobile_number_regex) &&
      this.password.match(Form.password_regex)
    ) {
      return true;
    }
    return false;
  }

  getValuesList() {
    if (!this.validation()) {
      return false;
    }
    let values = [];
    values.push(this.name);
    values.push(Form.makeNameSalt());
    let roll_number = this.roll_number;
    values.push(roll_number);
    values.push(roll_number.slice(0, 2));
    values.push(roll_number.slice(2, 4));
    values.push(roll_number.slice(4, 5));
    values.push(roll_number.slice(5, 8));
    values.push(this.mobile_number);
    values.push(this.password_store_schema == "0" ? false : true);
    // 0 for bcrypt 1 for AES
    if (this.password_store_schema === "0") {
      values.push(this.hashPassword0(this.password));
    } else {
      values.push(this.encryptPassword1(this.roll_number, this.password));
    }
    values.push(this.hostel);
    console.log(values);
    return values;
  }

  encryptPassword1(data, key) {
    var key = crypto
      .createHash("sha256")
      .update(String(key))
      .digest("base64")
      .substr(0, 32);
    var data = new Buffer.from(data, "base64");
    let cipher = crypto.createCipheriv("aes-256-ecb", key, "");
    cipher.setAutoPadding(true);
    let result = cipher.update(data).toString("base64");
    result += cipher.final().toString("base64");
    return result;
  }

  async hashPassword0(password) {
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const password_hash = await bcrypt.hash(password, salt);
    return password_hash;
  }
}

module.exports = Form;
