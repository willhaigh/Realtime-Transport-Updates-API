'use-strict'

// This will read in external .sql files when the application loads and return the files as a single object

const fs = require('fs-extra')
const { join } = require('path')

const loadSqlQueries = async folderName => {
    const filePath = join(process.cwd(), 'src', 'data', folderName)
    let files = await fs.readdir(filePath)
    const queries = {}
    for (file of files) {
        if (is_dir(join(filePath, file))) { // If subdirectory, get files in subdirectory, add .sql files to queries object
            subDirFiles = await fs.readdir(join(filePath, file))
            for (subDirFile of subDirFiles) {
                if (subDirFile.endsWith('.sql')) {
                    const query = fs.readFileSync(join(filePath, file, subDirFile), {encoding: 'UTF-8'})
                    queries[subDirFile.replace('.sql', '')] = query // Creating a property on queries object that specifies the contents of that .sql file
                }
            }
        } else {
            if (file.endsWith('.sql')) {
                const query = fs.readFileSync(join(filePath, file), {encoding: 'UTF-8'})
                queries[file.replace('.sql', '')] = query // Creating a property on queries object that specifies the contents of that .sql file
            }
        }
    }
    return queries
}

module.exports = {
    loadSqlQueries,
    _testIsDir: is_dir
}

function is_dir(path) {
    try {
        let stat = fs.lstatSync(path)
        return stat.isDirectory()
    } catch (e) {
        return false
    }
}