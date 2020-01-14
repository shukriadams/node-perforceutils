const 

    /**
     * regex match, returns empty string if no match found
     */
    safeMatch = function(string, reg){
        let m = string.match(reg);
        return m ? m.pop() : '';
    },

    /**
     * Converts a Perforce changeset string into a structured object
     */
    toChangeset = function(raw){

        // standardize line endings to unix, 
        raw = raw.replace(/\r\n/g, '\n')
        raw = raw.split('\n');

        let changeLine = changes.length > 0 ? changes[0] : '',
            description = changes.length > 2 ? changes[2] : '';
            filesRaw = changes.length > 6 ? changes.slice(6): [];

        // clean up files 
        let files = [];
        for (let file of filesRaw){
            file = file.trim();
            if (!file.length)
                continue;

            files.push(file);
        }

        return  {
            revision : safeMatch(changeLine, /Change (.*?) /),
            workspace : safeMatch(changeLine, /@(.*?) on/),
            user : safeMatch(changeLine, / by (.*?)@/), 
            date : new Date(safeMatch(changeLine, / on (.*)/) || new Date().getTime()),
            description : description,
            files : files
        }
    }
