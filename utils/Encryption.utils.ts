// import * as CryptoJS from 'crypto-js';

// export class Encryption {
//     encryptCypher(arg: string) {
//         var keyHex = CryptoJS.enc.Utf8.parse(
//             binaryToString(
//                 '000000010000001000000011000001010000011100001011' +
//                     '000011010001000100010010000100010000110100001011' +
//                     '000001110000001000000100000010000000000100000010' +
//                     '000000110000010100000111000010110000110100010001',
//             ),
//         );
//         var vectorHex = CryptoJS.enc.Utf8.parse(
//             binaryToString(
//                 '0000000100000010000000110000010100000111000010110000110100010001',
//             ),
//         );

//         var encrypted = CryptoJS.TripleDES.encrypt(
//             arg.trim(),
//             keyHex,
//             { iv: vectorHex },
//             {
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7,
//             },
//         );
//         return encrypted.toString();
//     }

//     decryptCypher(encoded: string) {
//         var keyHex = CryptoJS.enc.Utf8.parse(
//             binaryToString(
//                 '000000010000001000000011000001010000011100001011' +
//                     '000011010001000100010010000100010000110100001011' +
//                     '000001110000001000000100000010000000000100000010' +
//                     '000000110000010100000111000010110000110100010001',
//             ),
//         );
//         var vectorHex = CryptoJS.enc.Utf8.parse(
//             binaryToString(
//                 '0000000100000010000000110000010100000111000010110000110100010001',
//             ),
//         );

//         var decrypted = CryptoJS.TripleDES.decrypt(
//             encoded.trim(),
//             keyHex,
//             { iv: vectorHex },
//             {
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7,
//             },
//         );

//         return decrypted.toString(CryptoJS.enc.Utf8);
//     }
// }

// function binaryToString(str: string) {
//     // Removes the spaces from the binary string
//     str = str.trim().replace(/\s+/g, '');
//     // Pretty (correct) print binary (add a space every 8 characters)
//     str = str.match(/.{1,8}/g).join(' ');

//     let newBinary = str.split(' ');
//     let binaryCode = [];

//     for (let i = 0; i < newBinary.length; i++) {
//         binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
//     }
//     return binaryCode.join('');
// }

// //tested with unit 8 array's
// function binArrayToBinaryString(_array_: any) {
//     let bitsPerByte = 8;
//     let array = _array_;
//     let string = '';

//     function repeat(str, num) {
//         if (str.length === 0 || num <= 1) {
//             if (num === 1) {
//                 return str;
//             }

//             return '';
//         }

//         let result = '',
//             pattern = str;

//         while (num > 0) {
//             if (num & 1) {
//                 result += pattern;
//             }

//             num >>= 1;
//             pattern += pattern;
//         }

//         return result;
//     }

//     function lpad(obj, str, num) {
//         return repeat(str, num - obj.length) + obj;
//     }

//     Array.prototype.forEach.call(array, function (element) {
//         string += lpad(element.toString(2), '0', bitsPerByte);
//     });

//     return string;
// }
