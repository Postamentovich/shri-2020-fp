import * as R from "ramda";
/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

const api = new Api();

const processSequence = async ({ value, writeLog, handleSuccess, handleError }) => {
    const log = R.tap(writeLog);
    const successLog = (result) => handleSuccess(result);
    const failedLog = (error) => handleError(error);
    const isLengthLessThanTen = (a) => a.length < 10;
    const isLengthMoreThanTwo = (a) => a.length > 2;
    const isPositive = (a) => Number(a) >= 0;
    const createErrorMessage = () => handleError("ValidationError");
    const isValidate = R.allPass([isLengthLessThanTen, isLengthMoreThanTwo, isPositive]);
    const getParsedInteger = (value) => Number(value).toFixed(1);
    const getStringLength = (a) => a.length;
    const getSqrNumber = (a) => a * a;
    const getRemainderDivision = (a) => a % 3;

    const fetchAnimals = (id) =>
        api.get(`https://animals.tech/${id}`, {}).then(({ result }) => {
            successLog(result);
        });

    const processNumber = R.pipe(
        log,
        getStringLength,
        log,
        getSqrNumber,
        log,
        getRemainderDivision,
        log,
        fetchAnimals
    );

    const fetchNumber = (number) =>
        api
            .get("https://api.tech/numbers/base", { from: 10, to: 2, number })
            .then(({ result }) => {
                processNumber(result);
            })
            .catch((e) => {
                failedLog(e);
            });

    const parseInteger = R.pipe(getParsedInteger, log, fetchNumber);

    const result = R.pipe(log, R.ifElse(isValidate, parseInteger, createErrorMessage));

    return result(value);
};

export default processSequence;
