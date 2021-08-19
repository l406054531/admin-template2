export function exportExcel(arr, filename, tHeaderList, filterValList) {
    import ('./Export2Excel').then(excel => {
        const tHeader = tHeaderList
        const filterVal = filterValList
        const list = arr
        let lists = list.sort(() => {
            return function(a, b) {
                return a['sid'] - b['sid']
            }
        })
        const data = formatJson(filterVal, lists)
        excel.export_json_to_excel({
            header: tHeader,
            data,
            filename,
            // autoWidth: _this.autoWidth,
            // bookType: _this.bookType
        })
    })
}

function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
        return v[j]
    }))
}

export function excelList(arr) {
    let filterValList = []
    let tHeaderList = []
    for (let item of arr) {
        if (item.prop != "index") {
            filterValList.push(item.prop)
            tHeaderList.push(item.label)
        }
    }
    return [filterValList, tHeaderList]
}