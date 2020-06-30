import equals from "https://deno.land/x/validator_deno/src/lib/equals.ts";
import contains from "https://deno.land/x/validator_deno/src/lib/contains.ts";
import blacklist from "https://deno.land/x/validator_deno/src/lib/blacklist.ts";
import escape from "https://deno.land/x/validator_deno/src/lib/escape.ts";

// validator version
export const version = "1.0.0-beta";

// validators
import isAfter from "https://deno.land/x/validator_deno/src/lib/isAfter.ts";
import isAlpha, {
  locales as isAlphaLocales,
} from "https://deno.land/x/validator_deno/src/lib/isAlpha.ts";
import isAlphanumeric, {
  locales as isAlphanumericLocales,
} from "https://deno.land/x/validator_deno/src/lib/isAlphanumeric.ts";
import isAscii from "https://deno.land/x/validator_deno/src/lib/isAscii.ts";
import isBase32 from "https://deno.land/x/validator_deno/src/lib/isBase32.ts";
import isBase64 from "https://deno.land/x/validator_deno/src/lib/isBase64.ts";
import isBefore from "https://deno.land/x/validator_deno/src/lib/isBefore.ts";
import isBIC from "https://deno.land/x/validator_deno/src/lib/isBIC.ts";
import isBoolean from "https://deno.land/x/validator_deno/src/lib/isBoolean.ts";
import isBtcAddress from "https://deno.land/x/validator_deno/src/lib/isBtcAddress.ts";
import isByteLength from "https://deno.land/x/validator_deno/src/lib/isByteLength.ts";
import isCreditCard from "https://deno.land/x/validator_deno/src/lib/isCreditCard.ts";
import isCurrency from "https://deno.land/x/validator_deno/src/lib/isCurrency.ts";
import isDataURI from "https://deno.land/x/validator_deno/src/lib/isDataURI.ts";
import isDate from "https://deno.land/x/validator_deno/src/lib/isDate.ts";
import isDecimal from "https://deno.land/x/validator_deno/src/lib/isDecimal.ts";
import isDivisibleBy from "https://deno.land/x/validator_deno/src/lib/isDivisibleBy.ts";
import isEAN from "https://deno.land/x/validator_deno/src/lib/isEAN.ts";
import isEmail from "https://deno.land/x/validator_deno/src/lib/isEmail.ts";
import isEmpty from "https://deno.land/x/validator_deno/src/lib/isEmpty.ts";
import isEthereumAddress from "https://deno.land/x/validator_deno/src/lib/isEthereumAddress.ts";
import isFloat from "https://deno.land/x/validator_deno/src/lib/isFloat.ts";
import isFullWidth from "https://deno.land/x/validator_deno/src/lib/isFullWidth.ts";
import isFQDN from "https://deno.land/x/validator_deno/src/lib/isFQDN.ts";
import isHalfWidth from "https://deno.land/x/validator_deno/src/lib/isHalfWidth.ts";
import isHash from "https://deno.land/x/validator_deno/src/lib/isHash.ts";
import isHexadecimal from "https://deno.land/x/validator_deno/src/lib/isHexadecimal.ts";
import isHexColor from "https://deno.land/x/validator_deno/src/lib/isHexColor.ts";
import isHSL from "https://deno.land/x/validator_deno/src/lib/isHSL.ts";
import isIBAN from "https://deno.land/x/validator_deno/src/lib/isIBAN.ts";
import isIdentityCard from "https://deno.land/x/validator_deno/src/lib/isIdentityCard.ts";
import isIn from "https://deno.land/x/validator_deno/src/lib/isIn.ts";
import isInt from "https://deno.land/x/validator_deno/src/lib/isInt.ts";
import isIP from "https://deno.land/x/validator_deno/src/lib/isIP.ts";
import isIPRange from "https://deno.land/x/validator_deno/src/lib/isIPRange.ts";
import isISBN from "https://deno.land/x/validator_deno/src/lib/isISBN.ts";
import isISIN from "https://deno.land/x/validator_deno/src/lib/isISIN.ts";
import isISO31661Alpha2 from "https://deno.land/x/validator_deno/src/lib/isISO31661Alpha2.ts";
import isISO31661Alpha3 from "https://deno.land/x/validator_deno/src/lib/isISO31661Alpha3.ts";
import isISO8601 from "https://deno.land/x/validator_deno/src/lib/isISO8601.ts";
import isISRC from "https://deno.land/x/validator_deno/src/lib/isISRC.ts";
import isISSN from "https://deno.land/x/validator_deno/src/lib/isISSN.ts";
import isJSON from "https://deno.land/x/validator_deno/src/lib/isJSON.ts";
import isJWT from "https://deno.land/x/validator_deno/src/lib/isJWT.ts";
import isLatLong from "https://deno.land/x/validator_deno/src/lib/isLatLong.ts";
import isLocale from "https://deno.land/x/validator_deno/src/lib/isLocale.ts";
import isLowerCase from "https://deno.land/x/validator_deno/src/lib/isLowerCase.ts";
import isMACAddress from "https://deno.land/x/validator_deno/src/lib/isMACAddress.ts";
import isMagnetURI from "https://deno.land/x/validator_deno/src/lib/isMagnetURI.ts";
import isMimeType from "https://deno.land/x/validator_deno/src/lib/isMimeType.ts";
import isMongoId from "https://deno.land/x/validator_deno/src/lib/isMongoId.ts";
import isMobilePhone, {
  locales as mobilePhoneLocales,
} from "https://deno.land/x/validator_deno/src/lib/isMobilePhone.ts";
import isMultibyte from "https://deno.land/x/validator_deno/src/lib/isMultibyte.ts";
import isNumeric from "https://deno.land/x/validator_deno/src/lib/isNumeric.ts";
import isOctal from "https://deno.land/x/validator_deno/src/lib/isOctal.ts";
import isPassportNumber from "https://deno.land/x/validator_deno/src/lib/isPassportNumber.ts";
import isPort from "https://deno.land/x/validator_deno/src/lib/isPort.ts";
import isPostalCode, {
  locales as postalCodeLocales,
} from "https://deno.land/x/validator_deno/src/lib/isPostalCode.ts";
import isRFC3339 from "https://deno.land/x/validator_deno/src/lib/isRFC3339.ts";
import isRgbColor from "https://deno.land/x/validator_deno/src/lib/isRgbColor.ts";
import isSemVer from "https://deno.land/x/validator_deno/src/lib/isSemVer.ts";
import isSlug from "https://deno.land/x/validator_deno/src/lib/isSlug.ts";
import isSurrogatePair from "https://deno.land/x/validator_deno/src/lib/isSurrogatePair.ts";
import isUpperCase from "https://deno.land/x/validator_deno/src/lib/isUpperCase.ts";
import isURL from "https://deno.land/x/validator_deno/src/lib/isURL.ts";
import isUUID from "https://deno.land/x/validator_deno/src/lib/isUUID.ts";
import isVariableWidth from "https://deno.land/x/validator_deno/src/lib/isVariableWidth.ts";
import isWhitelisted from "https://deno.land/x/validator_deno/src/lib/isWhitelisted.ts";
import matches from "https://deno.land/x/validator_deno/src/lib/matches.ts";

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
