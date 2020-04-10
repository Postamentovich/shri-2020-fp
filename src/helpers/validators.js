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
const COLORS = { RED: "red", ORANGE: "orange", GREEN: "green", BLUE: "blue" };
const isCircleBlue = R.propEq(SHAPES.CIRCLE, COLORS.BLUE);
const isStarRed = R.propEq(SHAPES.STAR, COLORS.RED);
const isSquareOrange = R.propEq(SHAPES.SQUARE, COLORS.ORANGE);
const isGreen = (value) => value === COLORS.GREEN;
const isRedEqualsBlue = ({ blue, red }) => blue === red;
const getColors = R.compose(R.countBy(R.identity), R.values);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
    if (triangle !== "white" || circle !== "white") {
        return false;
    }
    return star === "red" && square === "green";
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (data) => {
    console.log(data);
};

// 3. Количество красных фигур равно кол-ву синих.

export const validateFieldN3 = R.compose(isRedEqualsBlue, getColors);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = R.allPass([isCircleBlue, isStarRed, isSquareOrange]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = R.compose(R.all(isGreen), R.values);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
