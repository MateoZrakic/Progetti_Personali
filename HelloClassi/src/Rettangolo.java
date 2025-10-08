public class Rettangolo {
    private float latoMinore;
    private float latoMaggiore;
    //Metodo costruttore permette di costruire un oggetto con dei valori passati come argomento del metodo
    public Rettangolo(float latoMinore, float latoMaggiore) {
        this.latoMinore = latoMinore;
        this.latoMaggiore = latoMaggiore;
    }

    public float calcolaArea(){
        return latoMinore * latoMaggiore;
    }

    public float calcolaPerimetro(){
        return latoMaggiore * 2 + latoMinore * 2;
    }

    public void stampaInformazioni(){
        System.out.println("Area: " + calcolaArea() + " Perimetro: " + calcolaPerimetro());
    }

    public void stampaDimensioni(){
        System.out.println("Lato Minore: " + latoMinore + " Lato Maggiore: " + latoMaggiore);
    }
    public Rettangolo() {
        this.latoMinore = 3;
        this.latoMaggiore = 9;
    }
}
