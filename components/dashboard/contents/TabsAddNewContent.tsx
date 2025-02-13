"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LanguagesData, TagsData, TargetData } from "@/utils/data";
import { CircleCheck, Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AlertMessage from "@/components/AlertMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { isEmptyString } from "@/utils/functions";
// import { Content } from "@prisma/client";
import {
  addNewContent,
  addNewContentSecond,
  newContentSecondType,
  newContentType,
} from "@/actions/content-actions";
import { categoryType, targetType } from "@/types/contentTypes";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

type Props = {
  categoryContent: categoryType;
};

const TabsAddNewContent = ({ categoryContent }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<categoryType>(categoryContent);
  const [subTitle, setSubTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [publishedAt, setPublishedAt] = useState<Date>(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [editor, setEditor] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [target, setTarget] = useState<targetType>("shonen");
  const [artist, setArtist] = useState("");
  const [isColored, setIsColored] = useState(
    category === "webtoon" ? true : false
  );

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // const [contentId, setContentId] = useState("");
  // const [content, setContent] = useState<Content | null>(null);

  const addImagesToFirebase = async () => {
    const images: string[] = [];
    if (!image) {
      return images;
    }
    const imgId = v4().toString().replace(/-/g, "");
    const coverRef = ref(storage, `servitoons/covers/${imgId}`);
    const imageRef = ref(storage, `servitoons/images/${imgId}`);

    // send the image
    const snapshot = await uploadBytes(imageRef, image);
    // Get the download URL
    const imgUrl = await getDownloadURL(snapshot.ref);
    images.push(imgUrl);

    if (cover) {
      const coverSnapshot = await uploadBytes(coverRef, cover);
      const coverUrl = await getDownloadURL(coverSnapshot.ref);
      images.push(coverUrl);
    }
    return images;
  };

  const handleCreateContent = async () => {
    setLoading(true);
    try {
      // first add content
      const formData: newContentType = {
        title,
        description: description.trim(),
        category,
        subtitle: subTitle.trim().toLowerCase(),
        publishedAt,
        tags,
        language,
        target,
        isColored,
      };

      const addContent = await addNewContent(formData);

      if (addContent.error) {
        toast({
          title: "Erreur de création",
          description: addContent.message,
          variant: "destructive",
        });
        return;
      }

      if (!addContent.contentId) {
        toast({
          title: "Erreur de création",
          description: "Veuillez réessayer plus tard!",
          variant: "destructive",
        });
        return;
      }

      // setContentId(addContent.contentId);

      // then add images
      const images = await addImagesToFirebase();

      if (images.length === 0) {
        toast({
          title: "Erreur d'upload",
          description: "Veuillez réessayer plus tard!",
          variant: "destructive",
        });
        return;
      }

      // then add artist and additional info

      const secondFormData: newContentSecondType = {
        artist: [artist.trim().toLowerCase(), "artist"],
        cover: images[1],
        image: images[0],
        editor: editor.trim().toLowerCase(),
        contentId: addContent.contentId,
      };

      const addContentSecond = await addNewContentSecond(secondFormData);

      if (addContentSecond.error) {
        toast({
          title:
            "Erreur d'ajout des images et des informations supplémentaires",
          description: addContentSecond.message,
          variant: "destructive",
        });
        return;
      }

      // setContent(addContentSecond.content);

      toast({
        title: "Contenu créé avec succès",
        description: "Le contenu a été créé avec succès!",
      });

      // navigate to content page
      // router.push(`/contenus/${addContent.contentId}`);
      router.refresh();
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Erreur de création",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <>
      <Tabs defaultValue="principal_info" className="w-full ">
        {/* tabs trigger */}
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="principal_info" className="line-clamp-1">
            principale Information
          </TabsTrigger>
          <TabsTrigger value="add_info" className="line-clamp-1">
            Additionnelle Information
          </TabsTrigger>
          <TabsTrigger value="edit" className="line-clamp-1">
            Edition
          </TabsTrigger>
          <TabsTrigger value="images" className="line-clamp-1">
            Cover et image
          </TabsTrigger>
        </TabsList>

        {/* tabs content */}
        <TabsContent value="principal_info">
          {/* main info */}
          <PrincipaleInfo
            title={title}
            description={description}
            category={category}
            subTitle={subTitle}
            setCategory={setCategory}
            setSubTitle={setSubTitle}
            setDescription={setDescription}
            setTitle={setTitle}
          />
        </TabsContent>

        {/* add info */}
        <TabsContent value="add_info">
          <AdditionaInformation
            isColored={isColored}
            language={language}
            setLanguage={setLanguage}
            setIsColored={setIsColored}
            setTags={setTags}
            tags={tags}
            setTarget={setTarget}
            target={target}
          />
        </TabsContent>

        {/* edition and other info */}
        <TabsContent value="edit">
          <EditorsOtherInfo
            // author={author}
            publishedAt={publishedAt}
            // setAuthor={setAuthor}
            setPublishedAt={setPublishedAt}
            artist={artist}
            setArtist={setArtist}
            editor={editor}
            setEditor={setEditor}
          />
        </TabsContent>

        {/* images */}
        <TabsContent value="images">
          <ImageCover
            cover={cover}
            image={image}
            setCover={setCover}
            setImage={setImage}
          />
        </TabsContent>
      </Tabs>

      {/* submit btn */}
      <Button
        className="w-full"
        disabled={
          loading ||
          isEmptyString(title) ||
          isEmptyString(description) ||
          !category ||
          !image ||
          !tags.length ||
          isEmptyString(target) ||
          isEmptyString(language) ||
          !publishedAt
        }
        onClick={handleCreateContent}
      >
        {loading ? "en cours..." : "Publier le contenu"}
      </Button>
    </>
  );
};

export default TabsAddNewContent;

// principale information
type PrincipaleInfoType = {
  title: string;
  description: string;
  category: categoryType;
  subTitle: string;

  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<categoryType>>;
  setSubTitle: React.Dispatch<React.SetStateAction<string>>;
};
const PrincipaleInfo = ({
  title,
  description,
  subTitle,
  setTitle,
  setDescription,

  setSubTitle,
}: PrincipaleInfoType) => {
  return (
    <div className="w-full flex flex-col gap-8 mt-4">
      <h2 className="lg:hidden">les principales Informations</h2>

      {/* Title */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Titre *</Label>
        <Input
          type="title"
          id="title"
          placeholder="ex: carnet de l’apothicaire"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          maxLength={500}
        />
      </div>

      {/* SubTitle */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="subTitle">Titre secondaire</Label>
        <Input
          type="text"
          id="subTitle"
          placeholder="ex: pour la création d'un carnet de l'apothicaire"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          maxLength={500}
        />
      </div>

      {/* desc */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="description-2">Description *</Label>
        <Textarea
          placeholder="Décrire votre oeuvre..."
          id="description-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={12}
        />
      </div>
    </div>
  );
};

// add info
type AdditionaInformationType = {
  language: string;
  tags: string[];
  target: targetType;
  isColored: boolean;

  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setIsColored: React.Dispatch<React.SetStateAction<boolean>>;
  setTarget: React.Dispatch<React.SetStateAction<targetType>>;
};

const AdditionaInformation = ({
  language,
  tags,
  target,
  isColored,
  setLanguage,
  setTags,
  setIsColored,
  setTarget,
}: AdditionaInformationType) => {
  // const [langs, setLangs] = useState<string[]>([]);
  //   const [tag, setTag] = useState("");
  return (
    <div className="w-full flex flex-col gap-8 mt-4">
      <h2 className="lg:hidden">Additionnelle Information</h2>

      {/* alert msg */}
      <AlertMessage
        title="Info additionnelle"
        message="Vous pouvez choisir une langue et aussi plusieurs tags en cliquant sur la langue ou ces différents tags."
        type="info"
      />

      {/* language */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="language">Langue *</Label>
        <div className="w-full flex flex-wrap gap-4 items-center">
          {LanguagesData.map((lan, idx) => (
            <button
              key={idx}
              className={cn(
                "flex items-center gap-1 hover:opacity-70 px-2 py-1 rounded-md",

                language.includes(lan.value) && " bg-primary"
              )}
              onClick={() => {
                // if (langs.includes(lan.value)) {
                //   setLangs(langs.filter((l) => l !== lan.value));
                //   setLanguage(langs.join(","));
                //   return;
                // }
                // setLangs([...langs, lan.value]);
                // setLanguage(langs.join(","));
                setLanguage(lan.value);
              }}
            >
              {language.includes(lan.value) ? (
                <CircleCheck className="size-4" />
              ) : (
                <Circle className="size-4" />
              )}
              <span>{lan.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* tags */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="tags">Tags ou genres</Label>
        {/* tags container */}
        <div className="w-full flex flex-col gap-2">
          {/* tags display */}
          <div
            className="h-60 lg:h-44 w-full overflow-x-hidden overflow-y-auto flex 
          flex-wrap gap-3 bg-secondary rounded-md p-2 items-start"
          >
            {TagsData.map((tg, idx) => (
              <Button
                key={idx}
                variant={tags.includes(tg.value) ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-1 hover:opacity-70 px-2 py-1 rounded-md",
                  "transition-all duration-500 ease-in-out"
                )}
                onClick={() => {
                  if (tags.includes(tg.value)) {
                    setTags(tags.filter((t) => t !== tg.value));
                    return;
                  }
                  if (tags.length >= 5) {
                    return;
                  }

                  setTags([...tags, tg.value]);
                }}
              >
                <span>{tg.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* target */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="target">Cible ou Audience *</Label>
        <Select
          value={target}
          onValueChange={(value: targetType) => setTarget(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chosir votre audience" />
          </SelectTrigger>
          <SelectContent>
            {TargetData.map((tg, idx) => (
              <SelectItem key={idx} value={tg.value}>
                {tg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* is colored */}
      <div className="flex items-center w-full gap-1.5">
        <Label htmlFor="isColored">En Couleur *</Label>

        <Switch
          id="isColored"
          name="isColored"
          checked={isColored}
          onCheckedChange={(val) => setIsColored(val)}
        />
      </div>
    </div>
  );
};

// Editors
type EditorsType = {
  // author: string;
  editor: string;
  artist: string;
  publishedAt: Date;

  // setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setEditor: React.Dispatch<React.SetStateAction<string>>;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
  setPublishedAt: React.Dispatch<React.SetStateAction<Date>>;
};

const EditorsOtherInfo = ({
  // author,
  editor,
  artist,
  publishedAt,
  // setAuthor,
  setEditor,
  setArtist,
  setPublishedAt,
}: EditorsType) => {
  return (
    <div className="w-full flex flex-col gap-8 mt-4">
      <h2 className="lg:hidden">Editeurs, Artistes et Date de publication</h2>

      {/* author */}
      {/* <div className="grid w-full gap-1.5">
        <Label htmlFor="author">Auteur *</Label>
        <Input
          type="text"
          id="author"
          placeholder="ex: Jean-Pierre de Coubertin"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          maxLength={100}
        />
      </div> */}

      {/* editor */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="editor">Editeur</Label>
        <Input
          type="text"
          id="editor"
          placeholder="ex: Éditions de la Sorbonne"
          value={editor}
          onChange={(e) => setEditor(e.target.value)}
          maxLength={100}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* artist */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="artist">Artiste</Label>
        <Input
          type="text"
          id="artist"
          placeholder="ex: Claude Gustave Renoir"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          maxLength={100}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* published at */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="publishedAt">Date de publication *</Label>
        <Input
          type="date"
          id="publishedAt"
          value={publishedAt ? publishedAt.toISOString().slice(0, 10) : ""}
          onChange={(e) => setPublishedAt(new Date(e.target.value))}
          required
        />
      </div>
    </div>
  );
};

type ImageCoverType = {
  image: File | null;
  cover: File | null;

  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setCover: React.Dispatch<React.SetStateAction<File | null>>;
};

const ImageCover = ({ image, cover, setImage, setCover }: ImageCoverType) => {
  return (
    <div className="w-full flex flex-col gap-8 mt-4">
      <h2 className="lg:hidden">Image de couverture et Couverture</h2>
      <AlertMessage
        title="Info supplémentaire"
        message="L'image doit etre en format carré pas plus de 1MB et pour l'image de couverture preferable en format rectangulaire et c'est optionnel."
        type="info"
      />

      {/* image */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="image">Image *</Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            const img = e.target.files;
            if (!img || !img.length) {
              //   setImage(null);
              return;
            }

            if (img[0].size > 1024 * 1024) {
              alert("L'image ne doit pas dépasser 1MB");
              return;
            }
            setImage(img[0]);
          }}
        />
        {image && (
          <div className="relative rounded bg-secondary">
            <Image
              className="max-w-36 mx-auto h-44 object-cover rounded"
              src={URL.createObjectURL(image)}
              alt="image"
              width={1000}
              height={1200}
              priority
            />

            <span
              className="absolute top-0 right-0 mt-3 mr-3 text-xs text-gray-600 hover:text-gray-800"
              onClick={() => {
                setImage(null);
              }}
              role="button"
              tabIndex={0}
              aria-label="Remove Image"
            >
              <X />
            </span>
          </div>
        )}
      </div>

      {/* cover */}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="cover">Couverture</Label>
        <Input
          type="file"
          id="cover"
          accept="image/*"
          onChange={(e) => {
            const img = e.target.files;
            if (!img || !img.length) {
              //   setCover(null);
              return;
            }

            if (img[0].size > 1024 * 1024) {
              alert("L'image ne doit pas dépasser 1MB");
              return;
            }
            setCover(img[0]);
          }}
        />

        {cover && (
          <div className="relative rounded bg-secondary">
            <Image
              className="w-full mx-auto h-44 object-cover rounded"
              src={URL.createObjectURL(cover)}
              alt="cover"
              width={1000}
              height={1200}
              priority
            />

            <span
              className="absolute top-0 right-0 mt-3 mr-3 text-xs text-gray-600 hover:text-gray-800"
              onClick={() => {
                setCover(null);
              }}
              role="button"
              tabIndex={0}
              aria-label="Remove Cover"
            >
              <X />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
