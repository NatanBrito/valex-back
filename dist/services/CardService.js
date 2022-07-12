var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository.js";
import { insert, findByCardId } from "../repositories/rechargeRepository.js";
import { findById } from "../repositories/businessRepository.js";
import * as paymentService from "../repositories/paymentRepository.js";
export var nameFormatter = function (name) {
    var nameArr = name.toUpperCase().split(" ");
    var firstName = nameArr[0];
    var lastName = nameArr[nameArr.length - 1];
    var middleName = nameArr.splice(1, nameArr.length - 2);
    var formattedMiddleName = [];
    middleName.forEach(function (name) { return name.length >= 3 && formattedMiddleName.push(name.slice(0, 1)); });
    return "".concat(firstName, " ").concat(formattedMiddleName.join(" "), " ").concat(lastName);
};
export function verifyAlreadyCardTypeExist(type, id) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyCardType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByTypeAndEmployeeId(type, id)];
                case 1:
                    verifyCardType = _a.sent();
                    if (verifyCardType)
                        throw { type: "conflict", status: 409, message: "already this card type" };
                    return [2 /*return*/, verifyCardType];
            }
        });
    });
}
export function expireDateCard() {
    var date = dayjs().add(5, "year").format("MM-YY");
    return date;
}
export function InsertCard(card) {
    return __awaiter(this, void 0, void 0, function () {
        var CreateCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.insert(card)];
                case 1:
                    CreateCard = _a.sent();
                    return [2 /*return*/, CreateCard];
            }
        });
    });
}
export function verifyCardRegisterById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyRegister;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    verifyRegister = _a.sent();
                    if (!verifyRegister) {
                        throw { type: "Invalid", status: 401, message: "card register not found" };
                    }
                    return [2 /*return*/, verifyRegister];
            }
        });
    });
}
export function BlockCard(id, card) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.update(id, card)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
export function recharge(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, insert(data)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function findBusinessById(businessId) {
    return __awaiter(this, void 0, void 0, function () {
        var find;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(businessId)];
                case 1:
                    find = _a.sent();
                    if (!find)
                        throw { type: "NotFound", status: 404, message: "business not found" };
                    return [2 /*return*/, find];
            }
        });
    });
}
export function verifyType(cardType, businessType) {
    if (cardType !== businessType) {
        throw {
            type: "NotFound",
            status: 401,
            message: "unauthorized purchase, card type invalid"
        };
    }
    return true;
}
export function verifyEnoughBalance(cardId, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyBalance, amountBalance, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findByCardId(cardId)];
                case 1:
                    verifyBalance = _a.sent();
                    amountBalance = verifyBalance.map(function (money) {
                        return money.amount;
                    });
                    balance = amountBalance.reduce(function (contador, curr) {
                        return contador + curr;
                    });
                    if (balance < amount)
                        throw { type: "unauthorized", status: 401, message: "insufficient funds" };
                    return [2 /*return*/, balance];
            }
        });
    });
}
export function insertPayment(payment) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, paymentService.insert(payment)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
export function Amount(balanceMoney) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, balance;
        return __generator(this, function (_a) {
            amount = balanceMoney.map(function (money) {
                return money.amount;
            });
            balance = amount.reduce(function (contador, curr) {
                return contador + curr;
            });
            return [2 /*return*/, balance];
        });
    });
}
export function Balance(cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var verifyBalance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findByCardId(cardId)];
                case 1:
                    verifyBalance = _a.sent();
                    return [2 /*return*/, verifyBalance];
            }
        });
    });
}
export function Purchases(cardId) {
    return __awaiter(this, void 0, void 0, function () {
        var allPurchases;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, paymentService.findByCardId(cardId)];
                case 1:
                    allPurchases = _a.sent();
                    return [2 /*return*/, allPurchases];
            }
        });
    });
}
