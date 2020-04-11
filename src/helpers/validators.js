import * as R from "ramda";

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const SHAPES = { STAR: "star", SQUARE: "square", TRIANGLE: "triangle", CIRCLE: "circle" };
const COLORS = { RED: "red", ORANGE: "orange", GREEN: "green", BLUE: "blue", WHITE: "white" };

const getValues = R.values;

const isGreen = (value) => value === COLORS.GREEN;
const isOrange = (value) => value === COLORS.ORANGE;
const isRed = (value) => value === COLORS.RED;
const isNotWhite = (value) => value !== COLORS.WHITE;
const isNotRed = (value) => value !== COLORS.RED;
const isRedEqualsBlue = ({ blue, red }) => blue === red;

const getColors = R.compose(R.countBy(R.identity), R.values);
const getStarColor = R.prop(SHAPES.STAR);
const getSquareColor = R.prop(SHAPES.SQUARE);
const getTriangleColor = R.prop(SHAPES.TRIANGLE);

const isCircleBlue = R.propEq(SHAPES.CIRCLE, COLORS.BLUE);
const isCircleWhite = R.propEq(SHAPES.CIRCLE, COLORS.WHITE);
const isStarRed = R.propEq(SHAPES.STAR, COLORS.RED);
const isSquareOrange = R.propEq(SHAPES.SQUARE, COLORS.ORANGE);
const isSquareGreen = R.propEq(SHAPES.SQUARE, COLORS.GREEN);
const isTriangleWhite = R.propEq(SHAPES.TRIANGLE, COLORS.WHITE);
const isTriangleGreen = R.propEq(SHAPES.TRIANGLE, COLORS.GREEN);
const isTriangleNotWhite = R.compose(isNotWhite, getTriangleColor);
const isSquareNotWhite = R.compose(isNotWhite, getSquareColor);
const isNotWhiteAndNotRed = R.allPass([isNotWhite, isNotRed]);
const isAllOrange = R.all(isOrange);
const isAllGreen = R.all(isGreen);
const isAnyRed = R.compose(R.any(isRed), getValues);

const isLessThanTwo = (value) => value <= 1;
const getGreenCount = R.prop(COLORS.GREEN);
const getWhiteCount = R.prop(COLORS.WHITE);
const isGreaterOrEqualThanTwo = R.gte(R.__, 2);
const isGreaterOrEqualThanThree = R.gte(R.__, 3);
const isColorMoreThanThree = R.compose(R.any(isGreaterOrEqualThanThree), R.values, getColors);
const isGreenCountEqualTwo = R.compose(R.equals(2), getGreenCount, getColors);
const isWhiteCountLessThanTwo = R.compose(
    R.anyPass([isLessThanTwo, R.isNil]),
    getWhiteCount,
    getColors
);
const isTriangleAndSquareColorsEqual = R.converge(R.equals, [
    R.prop(SHAPES.TRIANGLE),
    R.prop(SHAPES.SQUARE),
]);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = R.allPass([
    isStarRed,
    isSquareGreen,
    isCircleWhite,
    isTriangleWhite,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = R.compose(isGreaterOrEqualThanTwo, getGreenCount, getColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = R.compose(isRedEqualsBlue, getColors);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = R.allPass([isCircleBlue, isStarRed, isSquareOrange]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = R.allPass([isColorMoreThanThree, isWhiteCountLessThanTwo]);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = R.allPass([isTriangleGreen, isGreenCountEqualTwo, isAnyRed]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = R.compose(isAllOrange, getValues);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = R.compose(isNotWhiteAndNotRed, getStarColor);

// 9. Все фигуры зеленые.
export const validateFieldN9 = R.compose(isAllGreen, getValues);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = R.allPass([
    isTriangleAndSquareColorsEqual,
    isTriangleNotWhite,
    isSquareNotWhite,
]);
