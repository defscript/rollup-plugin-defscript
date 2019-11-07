
import fs from "fs"
import path from "path"
import escodegen from "escodegen"
import * as core from "defscript-core"

const optionDefaults = {
    extensions: ['.dfs']
}

const defscript = (options = optionDefaults) => {
    const settings = {
        ...optionDefaults,
        ...options
    }

    return {
        name: "defscript",
        
        load(id) {
            const ext = path.extname(id);

            if (settings.extensions.includes(ext)) {
                const options = {
                    type: 'module',
                    map: {
                        root: 'http://fake.com/fake',
                        source: id
                    }
                }

                const source = fs.readFileSync(id, 'utf8');
                const {code, map} = core.compile(source, options);

                return {code, map: map.toString()};
            } else {
                return null;
            }
        }
    }
}

export default defscript;
