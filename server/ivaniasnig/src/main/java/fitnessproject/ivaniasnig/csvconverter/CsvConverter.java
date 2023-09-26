//package fitnessproject.ivaniasnig.csvconverter;
//
//import java.util.Scanner;
//
//import org.springframework.stereotype.Component;
//
//@Component
//public class CsvConverter {     
//private final DietService ds;
//
//public CsvConverter(DietService ds) {
//	this.ds = ds;
//}
//
//public void convertCsv (String source) {
//	Scanner scanner = new Scanner(new FileReader(source));
//	
//	int totalLines = 0;
//	
//	while (scanner.hasNextLine()) {
//		totalLines++;
//		String line = scanner.nextLine();
//		line = line.trim();
//		String[] parts = line.split(",");
//		String food = parts[1];
//		String qty = parts[2];
//		String cal = parts[3];
//		
//		DietCsv diet = new DietCsv(food, qty, cal);
//		ds.saveDiet(diet);
//	}
//	System.out.println(totalLines);
//	scanner.close();
//}
//
//
//}
