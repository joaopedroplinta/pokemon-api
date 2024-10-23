import React from "react";

interface PokemonCardProps {
    name: string;
    image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold capitalize">{name}</h3>
        <img src={image} alt={name} className="w-24 h-24 mx-auto" />
        </div>
    );
};

export default PokemonCard;
