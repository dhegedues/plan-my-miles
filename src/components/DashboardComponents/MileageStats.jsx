const cards = [
  { name: 'Current', amount: '2.104km' },
  { name: 'Median weekly', amount: '298km' },
  { name: 'Target weekly', amount: '300km' },
]

function MileageStats() {
  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">Mileage</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5 flex items-center">
              <div className="flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-gray-500">
          In the upcoming 37 weeks, you can drive 300km/week on average in addition to your planned trips.
      </div>
    </div>
  )
}

export default MileageStats;