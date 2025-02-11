"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { isEmptyString } from "@/utils/functions";
import { authenticate, createNewUser } from "@/actions/auth-action";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (pathname !== "/connexion") {
        const resultCreate = await createNewUser({
          email: email,
          password: password,
        });
        if (resultCreate?.error) {
          toast({
            title: "Erreur d'inscription",
            description: resultCreate.message,
          });
          return;
        }
      }

      const result = await authenticate({
        email: email,
        password: password,
      });

      if (result?.error) {
        toast({
          title: "Erreur de connexion",
          description: result.message,
        });
        return;
      }

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté!",
      });

      router.refresh();
      location.reload();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erreur de connexion",
        description: "Veuillez réessayer plus tard!",
      });
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <form
      action={handleSubmit} // Assign la fonction handleSubmit à l'attribut action
      className="rounded-md relative px-2 flex flex-col gap-4 items-center justify-center w-full"
    >
      <h3 className="text-4xl font-bold">
        {pathname === "/connexion" ? "Re-Bonjour à vous!" : "Bienvenue à vous!"}
      </h3>

      {/* email */}
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        minLength={3}
        required
        autoCapitalize="off"
        autoComplete="email"
        autoCorrect="off"
        disabled={loading}
      />

      {/* password */}
      <div className="relative flex items-center w-full">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          maxLength={12}
          required
          autoCapitalize="off"
          autoComplete="current-password"
          autoCorrect="off"
          disabled={loading}
        />
        <span
          className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 focus:outline-none focus:ring-0"
          onClick={togglePasswordVisibility}
          role="button"
          tabIndex={0}
          aria-label="Toggle password visibility"
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </span>
      </div>

      {/* forget password */}
      {pathname === "/connexion" ? (
        <Link href="#" className="text-sm text-gray-400 hover:text-primary">
          Mot de passe oublié?
        </Link>
      ) : null}
      {/* submit */}
      {pathname === "/connexion" ? (
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={loading || isEmptyString(email) || isEmptyString(password)}
        >
          {!loading ? "Se connecter" : "connexion..."}
        </Button>
      ) : (
        <Button
          className="w-full mt-2"
          type="submit"
          disabled={loading || isEmptyString(email) || isEmptyString(password)}
        >
          {!loading ? "S'inscrire" : "Inscription..."}
        </Button>
      )}

      <p className="text-sm font-semibold text-center my-1">ou</p>

      {/* with google */}
      <Button
        className="w-full flex items-center gap-2"
        variant={"outline"}
        type="button"
        disabled={loading}
      >
        <FcGoogle />
        <span>Continuer avec Google</span>
      </Button>

      {/* with Facebook */}
      <Button
        className="w-full flex items-center gap-2"
        variant={"outline"}
        type="button"
        disabled={loading}
      >
        <FaFacebook className="text-blue-600" />
        <span>Continuer avec Facebook</span>
      </Button>

      {/* No account */}
      {pathname === "/connexion" ? (
        <p className="text-sm text-center mt-2">
          <span className="opacity-80">{`Vous n'avez pas de compte?`} </span>
          <Link href={"/inscription"} className=" font-medium">
            Créer un compte
          </Link>
        </p>
      ) : (
        <p className="text-sm text-center mt-2">
          <span className="opacity-80">{`Vous avez un compte?`} </span>
          <Link href={"/connexion"} className=" font-medium">
            Connectez-vous
          </Link>
        </p>
      )}
    </form>
  );
};

export default LoginForm;
