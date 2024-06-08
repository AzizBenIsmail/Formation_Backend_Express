const os = require('os');

module.exports.getOsInformation = async function (req, res) {
    try{
        const OsInformations = {
            hostname: os.hostname(),
            type: os.type(),
            platform: os.platform(),            
        }

        if(!OsInformations){ //if(OsInformations == undefined) // !undefined => defined => true
            throw new Error('there is no OsInformations ');
        }

        res.status(200).json(OsInformations);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports.osCpus = async function (req, res) {
    try{
        const osCpus = os.cpus();
        if(!osCpus){
        throw new Error('there is no cpus defined');
        }

        res.status(200).json({osCpus})
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports.osCpusById = async (req,res) => {
    try {
        const { id } = req.params;

        if(!Number.isInteger(parseInt(id))){
            throw new Error('you must provide a number!');
        }

        const osCpus = os.cpus();


        if(id < 0 ){
            throw new Error('you must provide a valid ID > 0 ');
        }

        if(id > osCpus.length -1){
            throw new Error('you must provide a valid ID 0 - 12')
        }

        if(!osCpus){
            throw new Error('there is no cpus defined');
        }



        res.status(200).json(osCpus[id])
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}