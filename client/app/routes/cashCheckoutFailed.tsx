import { Link } from "react-router";

export default function CartCheckoutFailed() {
  return (
    <div className="flex justify-center">
      <div className="card md:max-w-md">
        <div className="card-alert alert alert-error alert-soft" role="alert">
          <span className="font-bold">Erreur:</span>
          Une erreure s'est produit!
        </div>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Réessayez encore SVP!</h5>
         
          <Link to="/cart" className="btn btn-primary">
            Panier
          </Link>
        </div>
      </div>
    </div>
  );
}
