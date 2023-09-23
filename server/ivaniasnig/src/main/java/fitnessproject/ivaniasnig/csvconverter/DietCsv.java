package fitnessproject.ivaniasnig.csvconverter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DietCsv {
	private String food;
	private String qty;
	private String cal;
	
	public DietCsv(String food, String qty, String cal) {
		this.food = food;
		this.qty = qty;
		this.cal = cal;
	}
	
}
