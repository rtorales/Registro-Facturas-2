import dayjs from 'dayjs';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            name: item.name,
            publicUrl: item.publicUrl || ''
        }))
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },

        contribuyentesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.razon_social)
        },
        contribuyentesOneListFormatter(val) {
            if (!val) return ''
            return val.razon_social
        },
        contribuyentesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map(item => item.razon_social)
        },

}
