import * as React from "react"
import uuid4 from "uuid4"
import axios from "axios"


const URL_ADD_IMAGE = 'http://localhost:5000/items/upload';
const URL_ADD_ITEM = 'http://localhost:5000/items/addItem';
const AddItem = () => {
    const [insertImg, setInsertImg] = React.useState<string[]>([]);
    const [item, setItem] = React.useState(
        {
            id: uuid4(),
            title: "Introduceti  titlu",
            img: [""],
            sizes: {
                size: "Introduceti marimea",
                available: true,
                pieces: 1,
                color: "Introduceti culoarea",
                discount: 0
            },
            price: 0,
            favorite: false,
            cart: false,
            description: "Introduce ti o descriere"
        }
    )

    const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>, option: string): void => {

        const updateItem = e.target.value;
        setItem((item) => ({ ...item, [`${option}`]: updateItem }))

        if (option === 'size' || option === 'color')
            setItem((item) => ({ ...item, sizes: { ...item.sizes, [`${option}`]: updateItem } }))

    }


    const handleSubmitItem = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        await axios.post(URL_ADD_ITEM, item,
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                withCredentials: true
            }
        )
            .then(() => {
                alert("Item added successfully!");
            })
            .catch(() => {
                alert("Error adding item!");
            })
        console.log(item);
        setItem(item => ({ ...item, title: "", price: 0.00, description: "", img: [] }))
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!event.dataTransfer)
            throw new Error("No data transfer!");

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {

                setInsertImg([...insertImg, file.name]);
                setItem((item) => ({ ...item, img: [...item.img, file.name] }))

                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await axios.post(URL_ADD_IMAGE,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            withCredentials: true
                        }
                    )

                    if (response.status === 200) {
                        // afisez un altfel de raspuns
                        alert('File uploaded successfully!');
                    } else {
                        alert('File upload failed!');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert('Error uploading file!');
                }
            } else {
                alert('Please drop an image file.');
            }
        }
    };

    return (
        <div className="py-2 flex flex-col">
            <div className="flex flex-row my-1 gap-24">
                <div className="flex flex-col my-1">
                    <label htmlFor="title"> Nume </label>
                    <label htmlFor="price"> Pret </label>
                    <label htmlFor="size"> Marime </label>
                    <label htmlFor="color"> Culoare </label>
                    <label htmlFor="description"> Descriere </label>
                </div>
                <div className="flex flex-col my-1">
                    <input type="text" required name="title" placeholder={item.title} value={item.title} onChange={(e) => handleChangeItem(e, "title")} />
                    <input type="text" required name="price" placeholder={`${item.price}`} value={item.price} onChange={(e) => handleChangeItem(e, "price")} />
                    <input type="text" required name="size" placeholder={item.sizes.size} value={item.sizes.size} onChange={(e) => handleChangeItem(e, "size")} />
                    <input type="text" required name="color" placeholder={item.sizes.color} value={item.sizes.color} onChange={(e) => handleChangeItem(e, "color")} />
                    <input type="text" required name="description" placeholder={item.description} value={item.description} onChange={(e) => handleChangeItem(e, "description")} />
                </div>
            </div>
            <h4> In troduceti imagini</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg w-72 h-52 text-gray-300 text-center cursor-pointer">
                <div
                    className="drag-and-drop-img"
                    id="drop-area"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <br /><br /><br />
                    Drag & Drop Image Here
                </div>
                <div id="my-5 mx-2" className="preview">
                    {
                        insertImg &&
                        insertImg.map(img => (
                            <h4> {img} </h4>
                        ))
                    }
                </div>
            </div>
            <form onSubmit={e => handleSubmitItem(e)}>
                <input
                    type="submit"
                    value="Trimite item"
                    className="w-36 h-8"
                />
            </form>
        </div>
    );
}

export default AddItem;