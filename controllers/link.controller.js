const { nanoid } = require("nanoid");
const Link = require('../models/Link');

const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid });
        return res.json({ links });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error de servidor' })
    }

}

const getLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;
        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(404).json({ error: 'No existe el link' });

        return res.json({ longLink: link.longLink });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: 'error de servidor' })
    }
}

//para un crud normal
const getLinkCrud = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) return res.status(404).json({ error: 'No existe el link' });
        if (!link.uid.equals(req.uid)) return res.status(401).json({ error: 'no le pertenece ese link' })
        return res.json({ link });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: 'error de servidor' })
    }
}
const createLink = async (req, res) => {
    try {
        let { longLink } = req.body;
        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink;
        }
        const link = new Link({ longLink, nanoLink: nanoid(10), uid: req.uid });
        const newLink = await link.save();
        return res.status(201).json({ newLink });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error de servidor' })
    }
}


const deleteLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) return res.status(404).json({ error: 'No existe el link' });
        if (!link.uid.equals(req.uid)) return res.status(401).json({ error: 'no le pertenece ese link' });
        await link.deleteOne();
        return res.json({ link });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: 'error de servidor' })
    }
}

const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { longLink } = req.body;
        console.log(longLink);
        if (!longLink.startsWith("https://")) {
            longLink = "https://" + longLink;
        }
        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: 'No existe el link' });

        if (!link.uid.equals(req.uid)) return res.status(401).json({ error: 'no le pertenece ese link 🤡' });

        link.longLink = longLink;
        await link.save();
        return res.json({ link });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: 'error de servidor' })
    }
}



module.exports = {
    getLinks,
    createLink,
    getLink,
    deleteLink,
    updateLink,

}