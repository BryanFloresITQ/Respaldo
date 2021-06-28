const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character";

/**
 *  Retorna un personaje
 * @param {Number} id id del personaje
 * @returns { Promise<object>} Objeto del personaje
 */
var getCharacter = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            var { data: character } = await axios.get(`${URL}/${id}`);
            resolve(character);
        } catch (error) {
            reject("No data");
        }
    });

/**
 *  Retorna un array de personajes en base a los ids pasados
 * @param {Array<number>} ids ids de los personajes solicitados
 * @returns { Promise<Array<object>>} Array con los personajes solicitados
 */
var getSpecificCharacters = (ids) =>
    new Promise(async (resolve, reject) => {
        try {
            var { data: characters } = await axios.get(
                `${URL}/${ids.join(",")}`
            );
            resolve(characters);
        } catch (error) {
            reject("No data");
        }
    });

/**
 *  Retorna un array con los personajes de la pagina solicitada
 * @param {Number} page Numero de página que se solicita
 * @returns { Promise<Array<object>>} Lista de personajes en esa página
 */
var getByPage = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            var {
                data: { results },
            } = await axios.get(`${URL}?page=${page}`);
            resolve(results);
        } catch (error) {
            reject("No data");
        }
    });

/**
 *  Retorna un objeto con claves "pages" y "characteres"
 * @param {String} gender genero del personaje (female, male, genderless or unknown)
 * @param {Number} page página solicitada en caso de que haya demasiados personajes
 * @returns { Promise<object>} Objeto con clave "pages" que tiene el número de paginas y clave "characters" que contiene un array con los personajes
 */
var getByCharacterGender = (gender, page) =>
    new Promise(async (resolve, reject) => {
        try {
            var {
                data: {
                    results: characters,
                    info: { pages },
                },
            } = await axios.get(`${URL}/?gender=${gender}&page=${page}`);
            resolve({ characters: characters, pages: pages });
        } catch (error) {
            reject("No data");
        }
    });

module.exports.FetchData = {
    getCharacter,
    getSpecificCharacters,
    getByPage,
    getByCharacterGender,
};
