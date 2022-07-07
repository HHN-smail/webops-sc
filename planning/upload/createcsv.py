import csv
import string
import random
import bcrypt
import base64
import hashlib
# from Crypto.Cipher import AES
# from Crypto import Random
 

 
 
 
# def encrypt(raw, password):
    # BLOCK_SIZE = 16
    # pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
    # unpad = lambda s: s[:-ord(s[len(s) - 1:])]
    # private_key = hashlib.sha256(password.encode("utf-8")).digest()
    # raw = pad(raw)
    # iv = Random.new().read(AES.block_size)
    # cipher = AES.new(private_key, AES.MODE_CBC, iv)
    # return base64.b64encode(iv + cipher.encrypt(raw))

class rnrCSV:
    def __init__(self, file_readName = 'C:/Users/harih/cs/webops/planning/upload/hostel.csv', writing_fileName = 'C:/Users/harih/cs/webops/planning/upload/db.csv'):
        self.file_read = open(file_readName, "r")
        self.writing_file = open(writing_fileName, "w")
        self.csv_reader = csv.reader(self.file_read)
        self.csv_writer = csv.writer(self.writing_file)
        next(self.csv_reader)
    def write_into(self):
        for row in self.csv_reader:
            # print(row)
            self.writing_file.write(self.row_string(row))
    def row_string(self,row):
        row_string = ''
        row_string+=f'"{row[4]}",'
        row_string+=f'"{"".join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))}",'
        roll_number = row[5]
        row_string+=f'"{roll_number}",'
        row_string+=f'"{roll_number[0:2]}",'
        row_string+=f'"{roll_number[2:4]}",'
        row_string+=f'"{roll_number[4:5]}",'
        row_string+=f'"{roll_number[5:8]}",'
        row_string+=f'"{self.generateMobileNumber()}",'
        password_store_schema = random.choice("0")
        if(password_store_schema == "1"):
            row_string+=f'"{True}",'
            row_string+=f'"{self.encrypt(roll_number, "r*R}kun(RRt3y_g:,Gjw^,A}92NgcAXM")}",'
            # AES
            pass
        if(password_store_schema == "0"):
            row_string+=f'"{False}",'
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(roll_number.encode('utf-8'), salt)
            row_string += f'"{hashed}",'
            # bcrypt
            pass
        # print(row_string)
        row_string+= f'"{row[1]}"'
        return row_string + '\n'
    def encrypt(self,raw, password):
        BLOCK_SIZE = 16
        pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
        unpad = lambda s: s[:-ord(s[len(s) - 1:])]
        private_key = hashlib.sha256(password.encode("utf-8")).digest()
        raw = pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(private_key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw))

    def generateMobileNumber(self):
        mobile_number = ""
        mobile_number+=random.choice("6789")
        for i in range(9):
            mobile_number += random.choice("1234567890")
        return mobile_number








if __name__ == "__main__":
    a = rnrCSV()
    a.write_into()



