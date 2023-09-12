package fitnessproject.ivaniasnig.diet;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Meal {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;  
    private String type;  
    private int calories;
    
	public Meal(String name, String type, int calories) {

		this.name = name;
		this.type = type;
		this.calories = calories;
	} 
    

}
