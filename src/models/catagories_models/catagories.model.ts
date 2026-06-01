import { model, models, Schema } from "mongoose";

interface ICatagories {
    id?: Schema.Types.ObjectId
    name: string,
}

const categoriesSchema = new Schema<ICatagories>({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    }
}, { timestamps: true })

const Category = models.Category || model<ICatagories>(
    "Category",
    categoriesSchema
  )
export default Category

