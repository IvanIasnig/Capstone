package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Meal {

    @Id
    @GeneratedValue
    private UUID id;

    private String food;  
    private int grams;
    
	public Meal(String food, int grams) {

		this.food = food;
		this.grams = grams;
	} 
    

}
