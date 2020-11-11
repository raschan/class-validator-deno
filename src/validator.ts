import equals from "https://deno.land/x/validate@v0.4.0/src/libs/equals.ts";
import contains from "https://deno.land/x/validate@v0.4.0/src/libs/contains.ts";
import blacklist from "https://deno.land/x/validate@v0.4.0/src/libs/blacklist.ts";
import escape from "https://deno.land/x/validate@v0.4.0/src/libs/escape.ts";

// validator version
export const version = "1.0.0-beta";

// validators
import isAfter from "https://deno.land/x/validate@v0.4.0/src/libs/isAfter.ts";
import isAlpha, {
  locales as isAlphaLocales,
} from "https://deno.land/x/validate@v0.4.0/src/libs/isAlpha.ts";
import isAlphanumeric, {
  locales as isAlphanumericLocales,
} from "https://deno.land/x/validate@v0.4.0/src/libs/isAlphanumeric.ts";
import isAscii from "https://deno.land/x/validate@v0.4.0/src/libs/isAscii.ts";
import isBase32 from "https://deno.land/x/validate@v0.4.0/src/libs/isBase32.ts";
import isBase64 from "https://deno.land/x/validate@v0.4.0/src/libs/isBase64.ts";
import isBefore from "https://deno.land/x/validate@v0.4.0/src/libs/isBefore.ts";
import isBIC from "https://deno.land/x/validate@v0.4.0/src/libs/isBIC.ts";
import isBoolean from "https://deno.land/x/validate@v0.4.0/src/libs/isBoolean.ts";
import isBtcAddress from "https://deno.land/x/validate@v0.4.0/src/libs/isBtcAddress.ts";
import isByteLength from "https://deno.land/x/validate@v0.4.0/src/libs/isByteLength.ts";
import isCreditCard from "https://deno.land/x/validate@v0.4.0/src/libs/isCreditCard.ts";
import isCurrency from "https://deno.land/x/validate@v0.4.0/src/libs/isCurrency.ts";
import isDataURI from "https://deno.land/x/validate@v0.4.0/src/libs/isDataURI.ts";
import isDate from "https://deno.land/x/validate@v0.4.0/src/libs/isDate.ts";
import isDecimal from "https://deno.land/x/validate@v0.4.0/src/libs/isDecimal.ts";
import isDivisibleBy from "https://deno.land/x/validate@v0.4.0/src/libs/isDivisibleBy.ts";
import isEAN from "https://deno.land/x/validate@v0.4.0/src/libs/isEAN.ts";
import isEmail from "https://deno.land/x/validate@v0.4.0/src/libs/isEmail.ts";
import isEmpty from "https://deno.land/x/validate@v0.4.0/src/libs/isEmpty.ts";
import isEthereumAddress from "https://deno.land/x/validate@v0.4.0/src/libs/isEthereumAddress.ts";
import isFloat from "https://deno.land/x/validate@v0.4.0/src/libs/isFloat.ts";
import isFullWidth from "https://deno.land/x/validate@v0.4.0/src/libs/isFullWidth.ts";
import isFQDN from "https://deno.land/x/validate@v0.4.0/src/libs/isFQDN.ts";
import isHalfWidth from "https://deno.land/x/validate@v0.4.0/src/libs/isHalfWidth.ts";
import isHash from "https://deno.land/x/validate@v0.4.0/src/libs/isHash.ts";
import isHexadecimal from "https://deno.land/x/validate@v0.4.0/src/libs/isHexadecimal.ts";
import isHexColor from "https://deno.land/x/validate@v0.4.0/src/libs/isHexColor.ts";
import isHSL from "https://deno.land/x/validate@v0.4.0/src/libs/isHSL.ts";
import isIBAN from "https://deno.land/x/validate@v0.4.0/src/libs/isIBAN.ts";
import isIdentityCard from "https://deno.land/x/validate@v0.4.0/src/libs/isIdentityCard.ts";
import isIn from "https://deno.land/x/validate@v0.4.0/src/libs/isIn.ts";
import isInt from "https://deno.land/x/validate@v0.4.0/src/libs/isInt.ts";
import isIP from "https://deno.land/x/validate@v0.4.0/src/libs/isIP.ts";
import isIPRange from "https://deno.land/x/validate@v0.4.0/src/libs/isIPRange.ts";
import isISBN from "https://deno.land/x/validate@v0.4.0/src/libs/isISBN.ts";
import isISIN from "https://deno.land/x/validate@v0.4.0/src/libs/isISIN.ts";
import isISO31661Alpha2 from "https://deno.land/x/validate@v0.4.0/src/libs/isISO31661Alpha2.ts";
import isISO31661Alpha3 from "https://deno.land/x/validate@v0.4.0/src/libs/isISO31661Alpha3.ts";
import isISO8601 from "https://deno.land/x/validate@v0.4.0/src/libs/isISO8601.ts";
import isISRC from "https://deno.land/x/validate@v0.4.0/src/libs/isISRC.ts";
import isISSN from "https://deno.land/x/validate@v0.4.0/src/libs/isISSN.ts";
import isJSON from "https://deno.land/x/validate@v0.4.0/src/libs/isJSON.ts";
import isJWT from "https://deno.land/x/validate@v0.4.0/src/libs/isJWT.ts";
import isLatLong from "https://deno.land/x/validate@v0.4.0/src/libs/isLatLong.ts";
import isLocale from "https://deno.land/x/validate@v0.4.0/src/libs/isLocale.ts";
import isLowerCase from "https://deno.land/x/validate@v0.4.0/src/libs/isLowerCase.ts";
import isMACAddress from "https://deno.land/x/validate@v0.4.0/src/libs/isMACAddress.ts";
import isMagnetURI from "https://deno.land/x/validate@v0.4.0/src/libs/isMagnetURI.ts";
import isMimeType from "https://deno.land/x/validate@v0.4.0/src/libs/isMimeType.ts";
import isMongoId from "https://deno.land/x/validate@v0.4.0/src/libs/isMongoId.ts";
import isMobilePhone, {
  locales as mobilePhoneLocales,
} from "https://deno.land/x/validate@v0.4.0/src/libs/isMobilePhone.ts";
import isMultibyte from "https://deno.land/x/validate@v0.4.0/src/libs/isMultibyte.ts";
import isNumeric from "https://deno.land/x/validate@v0.4.0/src/libs/isNumeric.ts";
import isOctal from "https://deno.land/x/validate@v0.4.0/src/libs/isOctal.ts";
import isPassportNumber from "https://deno.land/x/validate@v0.4.0/src/libs/isPassportNumber.ts";
import isPort from "https://deno.land/x/validate@v0.4.0/src/libs/isPort.ts";
import isPostalCode, {
  locales as postalCodeLocales,
} from "https://deno.land/x/validate@v0.4.0/src/libs/isPostalCode.ts";
import isRFC3339 from "https://deno.land/x/validate@v0.4.0/src/libs/isRFC3339.ts";
import isRgbColor from "https://deno.land/x/validate@v0.4.0/src/libs/isRgbColor.ts";
import isSemVer from "https://deno.land/x/validate@v0.4.0/src/libs/isSemVer.ts";
import isSlug from "https://deno.land/x/validate@v0.4.0/src/libs/isSlug.ts";
import isSurrogatePair from "https://deno.land/x/validate@v0.4.0/src/libs/isSurrogatePair.ts";
import isUpperCase from "https://deno.land/x/validate@v0.4.0/src/libs/isUpperCase.ts";
import isURL from "https://deno.land/x/validate@v0.4.0/src/libs/isURL.ts";
import isUUID from "https://deno.land/x/validate@v0.4.0/src/libs/isUUID.ts";
import isVariableWidth from "https://deno.land/x/validate@v0.4.0/src/libs/isVariableWidth.ts";
import isWhitelisted from "https://deno.land/x/validate@v0.4.0/src/libs/isWhitelisted.ts";
import matches from "https://deno.land/x/validate@v0.4.0/src/libs/matches.ts";

function isLength(str: string, options: any) {
  let min;
  let max;
  if (typeof options === "object") {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }
  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  const len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === "undefined" || len <= max);
}

const validator = {
  isLength,
  equals,
  contains,
  blacklist,
  escape,
  isAfter,
  isAlpha,
  isAlphaLocales,
  isAlphanumeric,
  isAlphanumericLocales,
  isAscii,
  isBase32,
  isBase64,
  isBefore,
  isBIC,
  isBoolean,
  isBtcAddress,
  isByteLength,
  isCreditCard,
  isCurrency,
  isDataURI,
  isDate,
  isDecimal,
  isDivisibleBy,
  isEAN,
  isEmail,
  isEmpty,
  isEthereumAddress,
  isFloat,
  isFQDN,
  isFullWidth,
  isHalfWidth,
  isHash,
  isHexadecimal,
  isHexColor,
  isHSL,
  isIBAN,
  isIdentityCard,
  isIn,
  isInt,
  isISIN,
  isISO31661Alpha2,
  isISO31661Alpha3,
  isISO8601,
  isISBN,
  isISRC,
  isISSN,
  isJSON,
  isIP,
  isIPRange,
  isJWT,
  isLatLong,
  isLocale,
  isLowerCase,
  isMACAddress,
  isMagnetURI,
  isMimeType,
  isMongoId,
  isMobilePhone,
  isMultibyte,
  isNumeric,
  isOctal,
  isPassportNumber,
  isPort,
  isPostalCode,
  isRFC3339,
  isRgbColor,
  isSemVer,
  isSlug,
  isSurrogatePair,
  isUpperCase,
  isURL,
  isUUID,
  isVariableWidth,
  isWhitelisted,
  matches,
  mobilePhoneLocales,
  postalCodeLocales,
  version,
};

export default validator;
