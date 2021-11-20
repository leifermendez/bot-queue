const ExcelJS = require('exceljs');
const moment = require('moment');
const fs = require('fs');
/**
 * Guardar historial de conversacion
 * @param {*} number 
 * @param {*} message 
 */
const readChat = (number, message, step = null) => new Promise((resolve, reject) => {

    setTimeout(() => {
        number = number.replace('@c.us', '');
        number = `${number}@c.us`
        const pathExcel = `./chats/${number}.xlsx`;
        const workbook = new ExcelJS.Workbook();
        const today = moment().format('DD-MM-YYYY hh:mm')

        if (fs.existsSync(pathExcel)) {
            /**
             * Si existe el archivo de conversacion lo actualizamos
             */
            const workbook = new ExcelJS.Workbook();
            workbook.xlsx.readFile(pathExcel)
                .then(() => {
                    const worksheet = workbook.getWorksheet(1);
                    const lastRow = worksheet.lastRow;
                    let getRowInsert = worksheet.getRow(++(lastRow.number));
                    getRowInsert.getCell('A').value = today;
                    getRowInsert.getCell('B').value = message;

                    if (step) {
                        getRowInsert.getCell('C').value = step;
                    }

                    getRowInsert.commit();
                    workbook.xlsx.writeFile(pathExcel)
                        .then(() => {
                            const getRowPrevStep = worksheet.getRow(lastRow.number);
                            const lastStep = getRowPrevStep.getCell('C').value
                            resolve(lastStep)
                        })
                        .catch((err) => {
                            console.log('ERR', err);
                            reject('error')
                        })


                })
                .catch((err) => {
                    console.log('ERR', err);
                    reject('error')
                })

        } else {
            /**
             * NO existe el archivo de conversacion lo creamos
             */
            const worksheet = workbook.addWorksheet('Chats');
            worksheet.columns = [
                { header: 'Fecha', key: 'number_customer' },
                { header: 'Mensajes', key: 'message' },
                { header: 'Paso', key: 'step' },
            ];

            step = step || ''

            worksheet.addRow([today, message, step]);
            workbook.xlsx.writeFile(pathExcel)
                .then(() => {
                    resolve('STEP_1')
                })
                .catch((err) => {
                    console.log('Error', err);
                    reject('error')
                });

        }
    }, 150)

});

module.exports = { readChat }