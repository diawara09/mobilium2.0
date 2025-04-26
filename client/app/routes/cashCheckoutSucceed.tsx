import { Link } from "react-router";

export default function CartCheckoutSucceed() {
  return (
    <div className="flex justify-center">
      <div className="card md:max-w-md">
        <div className="card-alert alert alert-success alert-soft" role="alert">
          <span className="font-bold">Succès:</span>
          Votre commande est bien reçu avec succès
        </div>
        <div className="card-body">
          <h5 className="card-title mb-2.5">Félicitations</h5>
          <p className="mb-4">
            Nous vous contacterons avant la livraison! Merci de nous avoir choisi.Vous pouvez voir les details de votre commande
            en cliquant sur le lien ci-dessous.
          </p>
          <Link to="/admin/allOrders" className="btn btn-primary">
            Details 
          </Link>
        </div>
      </div>
    </div>
  );
}
