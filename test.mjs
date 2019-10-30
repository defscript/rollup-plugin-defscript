
import vm from "vm"
import fs from "fs"
import defscript from "."
import rollup from "rollup"

const regex = /[a-z\-]+/;

const getTests = function*() {
    for (const file of fs.readdirSync('test')) {
        if (regex.test(file))
            yield file;
    }
}

const run = async () => {

    for (const testName of getTests()) {

        const bundle = await rollup.rollup({
            input: `test/${testName}/main.js`,
            plugins: [defscript()]
        });

        const {output} = await bundle.generate({
            format: 'iife',
            name: 'test'
        });

        const [{code}] = output;


        console.log(code);

        vm.runInNewContext(code, {
            
        });
    }

}

run();